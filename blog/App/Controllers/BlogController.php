<?php

namespace Controllers;

use Silex\Application;
use Models\PostModel;

class BlogController
{

    public function showAllPostsAction(Application $app)
    {
        $posts = PostModel::all();
        return $app['twig']->render('postslist.twig', [
                    'posts' => $posts
        ]);
    }

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
