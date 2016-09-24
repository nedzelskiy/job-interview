<?php

namespace Models;

class BaseModel extends \ActiveRecord\Model
{

    private $_errors = [];

    public function getErrors()
    {
        return $this->_errors;
    }

    public function getError()
    {
        if (isset($this->_errors[0])) {
            return $this->_errors[0];
        }
        return null;
    }

    public function addError($error)
    {
        $this->_errors[] = $error;
    }
    
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
