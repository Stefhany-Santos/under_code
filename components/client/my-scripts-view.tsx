'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUserScripts, formatPrice, formatDate } from '@/lib/mock-data';
import { 
  Download, 
  FileText, 
  Package, 
  Calendar, 
  CreditCard,
  ExternalLink,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function MyScriptsView() {
  const { toast } = useToast();

  const handleDownload = (scriptName: string) => {
    toast({
      title: 'Download iniciado',
      description: `O download de "${scriptName}" comecou. Verifique sua pasta de downloads.`,
    });
  };

  const handleDocumentation = (scriptName: string) => {
    window.open(`https://docs.undercode.com/${scriptName.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
    toast({
      title: 'Documentacao',
      description: `Abrindo documentacao de "${scriptName}" em nova aba...`,
    });
  };

  const stats = [
    {
      icon: Package,
      value: mockUserScripts.length.toString(),
      label: 'Scripts Comprados',
    },
    {
      icon: Download,
      value: mockUserScripts.reduce((sum, p) => sum + p.downloadCount, 0).toString(),
      label: 'Total de Downloads',
    },
    {
      icon: CreditCard,
      value: formatPrice(mockUserScripts.reduce((sum, p) => sum + p.script.price, 0)),
      label: 'Investimento Total',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-white">Meus Scripts</h1>
        <p className="mt-2 text-zinc-400">
          Gerencie e baixe os scripts que voce adquiriu
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-[#0A0A0A] p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
              <stat.icon className="h-5 w-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scripts List */}
      <div className="rounded-lg border border-zinc-800 bg-[#0A0A0A]">
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="font-medium text-white">Scripts Disponiveis</h2>
          <Badge className="border border-zinc-700 bg-zinc-800 text-xs text-zinc-400">
            {mockUserScripts.length} scripts
          </Badge>
        </div>
        
        <div className="divide-y divide-zinc-800">
          {mockUserScripts.length > 0 ? (
            mockUserScripts.map((userScript, index) => (
              <motion.div 
                key={userScript.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex flex-col gap-4 p-6 transition-colors hover:bg-zinc-900/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  {/* Script icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
                    <span className="text-xl font-semibold text-zinc-500">
                      {userScript.script.name.charAt(0)}
                    </span>
                  </div>

                  {/* Script info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-white">
                        {userScript.script.name}
                      </h3>
                      <Badge 
                        className={`text-[10px] font-medium ${
                          userScript.script.framework === 'QBox' 
                            ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                            : 'border border-zinc-700 bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        {userScript.script.framework}
                      </Badge>
                      <Badge 
                        className={`text-[10px] ${
                          userScript.status === 'active' 
                            ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                            : 'border border-red-500/20 bg-red-500/10 text-red-400'
                        }`}
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {userScript.status === 'active' ? 'Licenca Ativa' : 'Suspensa'}
                      </Badge>
                    </div>
                    <p className="line-clamp-1 text-sm text-zinc-500">
                      {userScript.script.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(userScript.purchasedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        v{userScript.script.version}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        {userScript.downloadCount} downloads
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:flex-col lg:flex-row">
                  <Button 
                    size="sm"
                    className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                    onClick={() => handleDownload(userScript.script.name)}
                    disabled={userScript.status !== 'active'}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="gap-2 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    onClick={() => handleDocumentation(userScript.script.name)}
                  >
                    <FileText className="h-4 w-4" />
                    Docs
                    <ExternalLink className="h-3 w-3 text-zinc-500" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <div className="mb-6 rounded-full bg-zinc-900 p-6">
                <Package className="h-12 w-12 text-zinc-600" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-white">Nenhum script encontrado</h3>
              <p className="mb-6 max-w-sm text-zinc-500">
                Voce ainda nao comprou nenhum script. Explore nossa loja e encontre o script perfeito para seu servidor.
              </p>
              <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
                <ExternalLink className="h-4 w-4" />
                Explorar Loja
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
