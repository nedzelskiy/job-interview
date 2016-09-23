<?php

namespace Controllers;

use Silex\Application;
use Models\PostModel;

class BlogController
{

    public function showAllPosts(Application $app)
    {
        $posts = PostModel::all();
        return $app['twig']->render('postslist.twig', [
                    'posts' => $posts
        ]);
    }

    public function showPost(Application $app, $url)
    {
        $post = PostModel::find_by_url($url);
        return $app['twig']->render('post.twig', [
            'post' => $post
        ]);
    }

}
