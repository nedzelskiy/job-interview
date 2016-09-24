<?php

namespace Models;

use Models\BaseModel;
use Symfony\Component\Validator\Constraints as Assert;

class PostModel extends BaseModel
{

    public static $table_name = 'posts';

    public function isValid($validator)
    {
        if ($this->addValidatorErrors(
                        $validator->validate($this->title, new Assert\NotBlank(
                                [
                            'message' => 'Заголовок не указан!'
                                ])
                        )
                )) {
            return false;
        }

        if ($this->addValidatorErrors(
                        $validator->validate($this->description, new Assert\NotBlank(
                                [
                            'message' => 'Не указано краткое описание!'
                                ])
                        )
                )) {
            return false;
        }

        if ($this->addValidatorErrors(
                        $validator->validate($this->img, new Assert\NotBlank(
                                [
                            'message' => 'Не задан путь к изображению!'
                                ])
                        )
                )) {
            return false;
        }

        if ($this->addValidatorErrors(
                        $validator->validate($this->text, new Assert\NotBlank(
                                [
                            'message' => 'Не задан полный текст поста!'
                                ])
                        )
                )) {
            return false;
        }

        return true;
    }

    public function save($validate = true)
    {
        $self = new self();
        $post = $self::all([
            'conditions' => [
                '`url` = ? ', $this->url
            ],
            'limit' => 1
        ]);
        if ($post) {
            $this->addError('Данная новость уже была добавлена ранее!');
            return false;
        }
        return parent::save($validate);
    }

}
