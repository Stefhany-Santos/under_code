'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Store, 
  CreditCard, 
  Bell, 
  Shield, 
  Mail,
  Save
} from 'lucide-react';

export function AdminSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    storeName: 'Under Code',
    storeEmail: 'contato@undercode.com',
    supportEmail: 'suporte@undercode.com',
    pixEnabled: true,
    cardEnabled: true,
    emailNotifications: true,
    salesAlerts: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast({
      title: 'Configurações salvas',
      description: 'Suas alterações foram aplicadas com sucesso.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Store Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            Configurações da Loja
          </CardTitle>
          <CardDescription>Informações básicas da sua loja</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input
                id="storeName"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Email da Loja</Label>
              <Input
                id="storeEmail"
                type="email"
                value={settings.storeEmail}
                onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supportEmail">Email de Suporte</Label>
            <Input
              id="supportEmail"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Métodos de Pagamento
          </CardTitle>
          <CardDescription>Gerencie os métodos de pagamento aceitos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <div className="font-medium text-foreground">PIX</div>
              <div className="text-sm text-muted-foreground">Pagamento instantâneo via PIX</div>
            </div>
            <Switch
              checked={settings.pixEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, pixEnabled: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <div className="font-medium text-foreground">Cartão de Crédito</div>
              <div className="text-sm text-muted-foreground">Visa, Mastercard, Elo e outros</div>
            </div>
            <Switch
              checked={settings.cardEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, cardEnabled: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notificações
          </CardTitle>
          <CardDescription>Configure suas preferências de notificação</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Mail className="h-4 w-4" />
                Notificações por Email
              </div>
              <div className="text-sm text-muted-foreground">Receber atualizações importantes por email</div>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <div className="font-medium text-foreground">Alertas de Vendas</div>
              <div className="text-sm text-muted-foreground">Notificação em tempo real para cada venda</div>
            </div>
            <Switch
              checked={settings.salesAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, salesAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Segurança
          </CardTitle>
          <CardDescription>Configurações avançadas de segurança</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="space-y-0.5">
              <div className="font-medium text-foreground">Modo de Manutenção</div>
              <div className="text-sm text-muted-foreground">Desativa a loja temporariamente para manutenção</div>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
