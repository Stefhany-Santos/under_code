'use client';

// Auth-aware My Scripts component
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
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export function MyScripts() {
  const { toast } = useToast();

  const handleDownload = (scriptName: string) => {
    toast({
      title: 'Download iniciado',
      description: `O download de "${scriptName}" começou. Verifique sua pasta de downloads.`,
    });
  };

  const handleDocumentation = (scriptName: string) => {
    toast({
      title: 'Documentação',
      description: `Abrindo documentação de "${scriptName}"...`,
    });
  };

  const stats = [
    {
      icon: Package,
      value: mockUserScripts.length,
      label: 'Scripts Comprados',
    },
    {
      icon: Download,
      value: mockUserScripts.reduce((sum, p) => sum + p.downloadCount, 0),
      label: 'Total de Downloads',
    },
    {
      icon: CreditCard,
      value: formatPrice(mockUserScripts.reduce((sum, p) => sum + p.script.price, 0)),
      label: 'Total Investido',
    },
  ];

  return (
    <div className="min-h-screen bg-grid p-6">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Área do Cliente
          </Badge>
          <h2 className="text-3xl font-bold text-foreground">Meus Scripts</h2>
          <p className="mt-2 text-muted-foreground">
            Gerencie e baixe os scripts que você adquiriu
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card flex items-center gap-4 rounded-2xl p-5 transition-all hover:glow-primary-sm"
            >
              <div className="rounded-xl bg-primary/10 p-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scripts list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Scripts Disponíveis para Download</h3>
            <Badge variant="outline" className="border-primary/30 text-primary">
              {mockUserScripts.length} scripts
            </Badge>
          </div>
          
          <div className="space-y-4">
            {mockUserScripts.length > 0 ? (
              mockUserScripts.map((userScript, index) => (
                <motion.div 
                  key={userScript.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group flex flex-col gap-4 rounded-xl border border-border/50 bg-secondary/30 p-5 transition-all hover:border-primary/30 hover:bg-secondary/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    {/* Script icon */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 transition-all group-hover:from-primary/30 group-hover:to-primary/10">
                      <span className="text-3xl font-black text-primary/80">
                        {userScript.script.name.charAt(0)}
                      </span>
                    </div>

                    {/* Script info */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                          {userScript.script.name}
                        </h3>
                        <Badge 
                          className={`font-mono text-xs ${
                            userScript.script.framework === 'QBox' 
                              ? 'bg-primary/90 text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground border border-border'
                          }`}
                        >
                          {userScript.script.framework}
                        </Badge>
                        <Badge variant="outline" className={userScript.status === 'active' ? 'border-emerald-500/30 text-emerald-500' : 'border-amber-500/30 text-amber-500'}>
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          {userScript.status === 'active' ? 'Licença Ativa' : 'Suspensa'}
                        </Badge>
                      </div>
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {userScript.script.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
                      className="glow-primary-sm flex-1 gap-2 transition-all hover:scale-105 sm:flex-none"
                      onClick={() => handleDownload(userScript.script.name)}
                      disabled={userScript.status !== 'active'}
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 sm:flex-none"
                      onClick={() => handleDocumentation(userScript.script.name)}
                    >
                      <FileText className="h-4 w-4" />
                      Docs
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-6 rounded-full bg-muted/30 p-6">
                  <Package className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Nenhum script encontrado</h3>
                <p className="mb-6 max-w-sm text-muted-foreground">
                  Você ainda não comprou nenhum script. Explore nossa loja e encontre o script perfeito para seu servidor.
                </p>
                <Button className="glow-primary gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Explorar Loja
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
