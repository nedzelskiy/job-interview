<?php

use Symfony\Component\HttpFoundation\Request;

$app->get('/', function() use ($app) {
    return $app->redirect($app['url_generator']->generate('showAllPosts'));
})->bind('homePage');

$admin = $app['controllers_factory'];
$blog = $app['controllers_factory'];
$app->mount('/admin', $admin);
$app->mount('/blog', $blog);

// blog
$blog->get('/', 'BlogController:showAllPostsAction')->bind('showAllPosts');
$blog->get('/{url}', 'BlogController:showPostAction')->bind('showPost');

// admin
$admin->before(function() use($app) {
    if (!$app['admin']) {
        Header("WWW-Authenticate: Basic realm=\"Blog\"");
        $req = Request::createFromGlobals();
        $server = $req->server;
        if ($server->get('REQUEST_URI') === $app['url_generator']->generate('adminHomePage')) {
            $app->abort(401);
        } else {
            return $app->json(['Message' => 'Not Authorised'], 401);
        }
    }
    $app['admin'] = true;
});
$admin->get('/', function() use ($app) {
    return $app->redirect($app['url_generator']->generate('showCreatePostForm'));
})->bind('adminHomePage');

$admin->get('/posts/create', 'AdminController:showCreatePostFormAction')->bind('showCreatePostForm');
$admin->get('/exit', function() use ($app) {
    $app['admin'] = false;
    return $app->abort(401, 'Not Authorised');
})->bind('adminExit');

$admin->post('/post/create', 'AdminController:createNewPostAction')->bind('createPost');


