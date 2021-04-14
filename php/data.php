<?php
    class Data {

        private $backgroundImagePath, $linkToGithub, $logo, $alt, $caption;
        
        public function __construct($backgroundImagePath, $linkToGithub, $logo, $alt, $caption) {
            $this->backgroundImagePath = $backgroundImagePath;
            $this->linkToGithub = $linkToGithub;
            $this->logo = $logo;
            $this->alt = $alt;
            $this->caption = $caption;
        }

        public function getBackgroundImagePath() { return $this->backgroundImagePath; }

        public function getLinkToGithub() { return $this->linkToGithub; }

        public function getLogo() { return $this->logo; }

        public function getAlt() { return $this->alt; }

        public function getCaption() { return $this->caption; }
    }