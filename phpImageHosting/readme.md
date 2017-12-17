Goal:

Without using frameworks, write a backend for hosting pictures, in which you can upload 1-5 images at a time. For each image should be created preview (100x100px). Generation of previews should be performed in the queue. After the preview is generated, the frontend can send requests for changes to the title and description of the picture (meta-information), as well as to delete it.

Requirements:
- gd lib
- amqp php extension
- rabitmq local running

Steps:
- Configure your settings php: post_max_size, upload_max_filesize, memory_limit...
- Configure read/write rights for folders thumbs, uploads
- Run daemon: thumbs_daemon.php
- Go to your browser and open index.html under running php server
- Enjoy

