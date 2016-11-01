<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/{product}", name="product_cookies", requirements={"product": "(cookies|user|file)"}))
     */
    public function productAction($product)
    {
        // replace this example code with whatever you need
        return $this->render('default/'. $product . '.html.twig');
    }
}
