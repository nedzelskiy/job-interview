<?php

namespace Models;

class BaseModel extends \ActiveRecord\Model
{
    
    // Текстовый массив ошибок, которые могут возникнуть
    // при валидации или проведения операций с бд
    private $_errors = [];
    
    
    /**
     * Возвращает приватный массив $_errors класса BaseModel
     * 
     * @return array
     * 
     */
    public function getErrors()
    {
        return $this->_errors;
    }

    /**
     * Если в приватном массиве $_errors класса BaseModel
     * есть елементы, то берет первый и возвращает
     * иначе возвращает null
     * 
     * @return null|string
     */
    public function getError()
    {
        if (isset($this->_errors[0])) {
            return $this->_errors[0];
        }
        return null;
    }

    /**
     * Добавляет сообщениe об ошибкe в
     * приватный массив $_errors класса BaseModel
     * 
     * @param string $error
     */
    public function addError($error)
    {
        $this->_errors[] = $error;
    }
    
    /**
     * Добавляет все сообщения об ошибках в
     * приватный массив $_errors класса BaseModel
     * 
     * @param array $errors масив объектов ошибок 
     * @return boolean
     * 
     */
    public function addValidatorErrors($errors)
    {
        if (count($errors) > 0) {
            foreach ($errors as $error) {
                $this->addError($error->getMessage());
            }
            return true;
        }
        return false;
    }

}
