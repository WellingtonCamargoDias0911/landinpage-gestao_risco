import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página não encontrada | Grafo Capital</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-slate-400 mb-8">A página que você procura não existe ou foi movida.</p>
        <div className="flex gap-4">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Home className="w-4 h-4 mr-2" />
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;