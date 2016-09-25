<?php

namespace Controllers;

use Silex\Application;
use Models\PostModel;

/**
 * Управляет блогом
 */
class BlogController
{
    /**
     * Отдает html страницу всех новостей
     * 
     * @param object $app Silex\Application
     * @return string html
     */
    public function showAllPostsAction(Application $app)
    {
        $posts = PostModel::all();
        return $app['twig']->render('postslist.twig', [
                    'posts' => $posts
        ]);
    }

    /**
     * Отдает html страницу конкретной новости или 
     * бросает исключение с кодом, если новость не найдена
     * 
     * @param object $app Silex\Application
     * @param string $url 
     * @return string|object html при успехе или 
     * Symfony\Component\HttpKernel\Exception\HttpException
     * при ошибке
     */
    public function showPostAction(Application $app, $url)
    {
        $post = PostModel::find_by_url($url);
        if (!$post) {
            return $app->abort(404);
        }
        return $app['twig']->render('post.twig', [
            'post' => $post
        ]);
    }

}
