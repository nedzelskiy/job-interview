<?php

namespace Controllers;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Models\PostModel;
use Services\UrlService;

class AdminController
{

    public function showCreatePostFormAction(Application $app)
    {
        return $app['twig']->render('createpost.twig');
    }
    
    public function createNewPostAction(Application $app, Request $req)
    {
        $model = new PostModel();
        $model->title = $app->escape($req->get('title'));
        $model->img = $app->escape($req->get('img'));
        $model->description = $app->escape($req->get('description'));
        $model->url = UrlService::makeUrlFromSting($model->title);
        $model->text = $app->escape($req->get('text'));
        if ($model->isValid($app['validator'])) {
            if ($model->save()) {
                return new JsonResponse([
                    'success' => true,
                    'message' => 'Новость успешно добавлена!'
                ], JsonResponse::HTTP_CREATED);
            }
        }
        return new JsonResponse([
            'success' => false,
            'message' => $model->getError()
        ], JsonResponse::HTTP_OK);
    }
}
