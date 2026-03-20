'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, FileText, Shield, ChevronRight } from 'lucide-react';

type SupportSection = 'faq' | 'terms' | 'privacy';

const sidebarItems = [
  { id: 'faq' as const, label: 'Central de Ajuda (FAQ)', icon: HelpCircle },
  { id: 'terms' as const, label: 'Termos de Servico', icon: FileText },
  { id: 'privacy' as const, label: 'Politica de Privacidade', icon: Shield },
];

export function SupportView() {
  const [activeSection, setActiveSection] = useState<SupportSection>('terms');

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 border-b border-zinc-900 pb-8">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-emerald-500">
            Suporte e Legal
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-white">
            Central de Suporte
          </h1>
          <p className="mt-2 text-zinc-400">
            Encontre ajuda, leia nossos termos e politicas.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Sidebar */}
          <aside className="shrink-0 lg:sticky lg:top-24 lg:h-fit lg:w-64">
            <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`group flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'border-l-2 border-emerald-500 bg-zinc-900/50 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900/30 hover:text-zinc-200'
                  }`}
                >
                  <item.icon className={`h-4 w-4 shrink-0 ${
                    activeSection === item.id ? 'text-emerald-500' : 'text-zinc-500'
                  }`} />
                  {item.label}
                  {activeSection === item.id && (
                    <ChevronRight className="ml-auto hidden h-4 w-4 text-emerald-500 lg:block" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <main className="min-w-0 flex-1 pb-24">
            <motion.article
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose prose-invert prose-emerald max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-4 prose-h2:mt-12 prose-h2:mb-6 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline"
            >
              {activeSection === 'faq' && <FAQContent />}
              {activeSection === 'terms' && <TermsContent />}
              {activeSection === 'privacy' && <PrivacyContent />}
            </motion.article>
          </main>
        </div>
      </div>
    </div>
  );
}

function FAQContent() {
  return (
    <>
      <h1>Central de Ajuda (FAQ)</h1>
      <p>
        Encontre respostas para as perguntas mais frequentes sobre nossos scripts e servicos.
      </p>

      <h2>Como funciona a compra?</h2>
      <p>
        Apos realizar o pagamento, voce recebera automaticamente acesso ao script atraves do seu painel de cliente. 
        O download estara disponivel imediatamente e voce podera acessar as atualizacoes futuras gratuitamente.
      </p>

      <h2>Qual framework e suportado?</h2>
      <p>
        Oferecemos scripts para os dois principais frameworks de FiveM:
      </p>
      <ul>
        <li><strong>QBox</strong> - O framework mais moderno e otimizado</li>
        <li><strong>QBCore</strong> - O framework mais popular e com maior comunidade</li>
      </ul>
      <p>
        Cada produto indica claramente qual framework e suportado na pagina do produto.
      </p>

      <h2>Como instalar os scripts?</h2>
      <p>
        Todos os nossos scripts vem com documentacao completa de instalacao. O processo basico e:
      </p>
      <ul>
        <li>Baixe o script do seu painel de cliente</li>
        <li>Extraia os arquivos na pasta resources do seu servidor</li>
        <li>Execute os comandos SQL incluidos (se houver)</li>
        <li>Adicione o script ao seu server.cfg</li>
        <li>Reinicie o servidor</li>
      </ul>

      <h2>Como funciona o suporte?</h2>
      <p>
        Oferecemos suporte dedicado atraves do nosso Discord. Nossa equipe esta disponivel para ajudar com:
      </p>
      <ul>
        <li>Duvidas sobre instalacao</li>
        <li>Problemas tecnicos</li>
        <li>Configuracao e personalizacao</li>
        <li>Bugs e erros</li>
      </ul>
      <p>
        O tempo medio de resposta e de <strong>24 horas</strong> em dias uteis.
      </p>

      <h2>Posso pedir reembolso?</h2>
      <p>
        Devido a natureza digital dos produtos, reembolsos sao analisados caso a caso. Consulte nossa 
        politica de reembolso nos Termos de Servico para mais detalhes.
      </p>
    </>
  );
}

function TermsContent() {
  return (
    <>
      <h1>Termos de Servico</h1>
      <p>
        Ultima atualizacao: Janeiro de 2025
      </p>
      <p>
        Ao adquirir qualquer produto da Under Code, voce concorda com os seguintes termos e condicoes. 
        Por favor, leia atentamente antes de realizar qualquer compra.
      </p>

      <h2>1. Licenca de Uso</h2>
      <p>
        Ao comprar um script da Under Code, voce recebe uma <strong>licenca pessoal e intransferivel</strong> para uso 
        em <strong>um unico servidor de FiveM</strong>. Esta licenca permite:
      </p>
      <ul>
        <li>Instalar e usar o script no seu servidor</li>
        <li>Modificar o codigo para adequar as suas necessidades</li>
        <li>Receber atualizacoes gratuitas do script</li>
        <li>Suporte tecnico atraves do Discord</li>
      </ul>

      <h2>2. Restricoes de Uso</h2>
      <p>
        A licenca <strong>NAO</strong> permite:
      </p>
      <ul>
        <li><strong>Redistribuicao:</strong> Voce nao pode compartilhar, vender, distribuir ou sublicenciar o script para terceiros</li>
        <li><strong>Uso multiplo:</strong> Cada licenca e valida para apenas um servidor. Servidores adicionais requerem licencas adicionais</li>
        <li><strong>Revenda:</strong> Voce nao pode revender o script, modificado ou nao</li>
        <li><strong>Leaking:</strong> Vazamento de codigo e estritamente proibido e resultara em banimento permanente</li>
        <li><strong>Remocao de protecao:</strong> Tentativas de remover sistemas de protecao anti-leak sao proibidas</li>
      </ul>

      <h2>3. Politica de Reembolso</h2>
      <p>
        Devido a natureza digital dos produtos, nossa politica de reembolso segue as seguintes diretrizes:
      </p>
      <ul>
        <li><strong>Nao oferecemos reembolso</strong> apos o download do script</li>
        <li>Casos de erro tecnico comprovado serao analisados individualmente</li>
        <li>Incompatibilidade com outros scripts nao e motivo para reembolso</li>
        <li>Arrependimento de compra nao e motivo para reembolso</li>
      </ul>
      <p>
        <strong>Chargebacks fraudulentos</strong> resultarao em banimento permanente de todos os nossos servicos 
        e possivel acao legal.
      </p>

      <h2>4. Atualizacoes e Suporte</h2>
      <p>
        Todos os scripts incluem:
      </p>
      <ul>
        <li>Atualizacoes gratuitas por tempo indeterminado</li>
        <li>Correcoes de bugs e melhorias</li>
        <li>Suporte tecnico via Discord</li>
        <li>Documentacao completa</li>
      </ul>
      <p>
        Nos reservamos o direito de descontinuar atualizacoes para produtos especificos com aviso previo de 30 dias.
      </p>

      <h2>5. Propriedade Intelectual</h2>
      <p>
        Todos os scripts sao propriedade intelectual da Under Code. A compra concede apenas o direito de uso, 
        nao a propriedade do codigo-fonte ou direitos autorais.
      </p>

      <h2>6. Alteracoes nos Termos</h2>
      <p>
        Reservamo-nos o direito de alterar estes termos a qualquer momento. Alteracoes significativas serao 
        comunicadas por email ou atraves do Discord.
      </p>

      <h2>7. Contato</h2>
      <p>
        Para duvidas sobre estes termos, entre em contato atraves do nosso <a href="#">Discord</a> ou 
        envie um email para <strong>suporte@undercode.com</strong>.
      </p>
    </>
  );
}

function PrivacyContent() {
  return (
    <>
      <h1>Politica de Privacidade</h1>
      <p>
        Ultima atualizacao: Janeiro de 2025
      </p>
      <p>
        A Under Code respeita sua privacidade e esta comprometida em proteger seus dados pessoais. 
        Esta politica descreve como coletamos, usamos e protegemos suas informacoes.
      </p>

      <h2>1. Dados Coletados</h2>
      <p>
        Coletamos as seguintes informacoes quando voce utiliza nossos servicos:
      </p>
      <ul>
        <li><strong>Dados de cadastro:</strong> Nome, email, senha (criptografada)</li>
        <li><strong>Dados de compra:</strong> Historico de pedidos, metodo de pagamento (processado por terceiros)</li>
        <li><strong>Dados tecnicos:</strong> Endereco IP, navegador, sistema operacional</li>
        <li><strong>Dados de uso:</strong> Scripts baixados, acessos ao painel</li>
      </ul>

      <h2>2. Uso dos Dados</h2>
      <p>
        Utilizamos seus dados para:
      </p>
      <ul>
        <li>Processar suas compras e fornecer acesso aos produtos</li>
        <li>Fornecer suporte tecnico</li>
        <li>Enviar atualizacoes sobre seus produtos</li>
        <li>Detectar e prevenir fraudes</li>
        <li>Melhorar nossos servicos</li>
      </ul>

      <h2>3. Compartilhamento de Dados</h2>
      <p>
        <strong>Nao vendemos</strong> seus dados pessoais. Compartilhamos informacoes apenas com:
      </p>
      <ul>
        <li><strong>Processadores de pagamento:</strong> Para processar transacoes</li>
        <li><strong>Servicos de hospedagem:</strong> Para armazenar dados de forma segura</li>
        <li><strong>Autoridades legais:</strong> Quando exigido por lei</li>
      </ul>

      <h2>4. Seguranca</h2>
      <p>
        Implementamos medidas de seguranca para proteger seus dados:
      </p>
      <ul>
        <li>Criptografia SSL em todas as conexoes</li>
        <li>Senhas armazenadas com hash seguro</li>
        <li>Acesso restrito aos dados pessoais</li>
        <li>Monitoramento contra acessos nao autorizados</li>
      </ul>

      <h2>5. Seus Direitos</h2>
      <p>
        Voce tem direito a:
      </p>
      <ul>
        <li>Acessar seus dados pessoais</li>
        <li>Corrigir dados incorretos</li>
        <li>Solicitar exclusao dos seus dados</li>
        <li>Exportar seus dados</li>
        <li>Revogar consentimentos</li>
      </ul>

      <h2>6. Cookies</h2>
      <p>
        Utilizamos cookies essenciais para funcionamento do site e cookies de analise para melhorar 
        a experiencia do usuario. Voce pode gerenciar cookies nas configuracoes do seu navegador.
      </p>

      <h2>7. Contato</h2>
      <p>
        Para questoes sobre privacidade, entre em contato atraves do email <strong>privacidade@undercode.com</strong>.
      </p>
    </>
  );
}
