# 🚀 ZenMV Digital - Site Profissional Completo

Site estático de alta performance, otimizado para SEO Local e conversão, desenvolvido para a ZenMV Digital (Poá - SP).

## 📋 Instruções de Instalação e Configuração

1. **Hospedagem**: Faça o upload destes 6 arquivos para qualquer hospedagem estática (Vercel, Netlify, GitHub Pages, Hostgator, etc.).
2. **Configurar IDs de Marketing**: Abra o `index.html` e substitua todos os placeholders `[INSIRA SEU ... AQUI]` pelos seus IDs reais:
   - GA4 ID (Ex: `G-XXXXXXXXXX`)
   - Google Ads ID (Ex: `AW-XXXXXXXXX`)
   - GTM ID (Ex: `GTM-XXXXXXX`)
   - Meta Pixel ID (Ex: `1234567890`)
3. **Domínio**: Atualize a tag `<link rel="canonical">` e as meta tags Open Graph com o domínio real (Ex: `https://zenmvdigital.com.br`).

## ✅ Checklist de Pré-Lançamento

- [ ] Testar formulário de contato (verificar se abre o WhatsApp com os dados preenchidos).
- [ ] Verificar se o botão flutuante do WhatsApp está pulsando e com o link correto.
- [ ] Testar o modo escuro (Dark Mode) e se a preferência é salva ao recarregar a página.
- [ ] Validar o banner de cookies (aceitar, rejeitar e verificar se o `localStorage` é atualizado).
- [ ] Passar o site no [Google PageSpeed Insights](https://pagespeed.web.dev/) (meta: >90 no mobile).
- [ ] Testar a barra fixa inferior no celular (max-width: 768px).

## 📈 Guia de Publicação e Marketing

### 1. Configuração de Ferramentas
- **Google Meu Negócio**: Crie/Reivindique o perfil "ZenMV Digital" em Poá. Adicione o link do site, fotos da equipe e peça os primeiros 5 avaliações de clientes reais.
- **GTM**: Crie uma conta no Google Tag Manager. Adicione a tag do GA4 e do Meta Pixel. Configure um acionador de "Clique no Link do WhatsApp" para rastrear conversões.
- **Meta Pixel**: No Gerenciador de Eventos do Facebook, configure o evento "Lead" para disparar quando o modal de sucesso do formulário for exibido.

### 2. Plano de Ação de Marketing Local (8 Semanas)
- **Semana 1-2**: Lançamento do site. Atualização de todas as redes sociais (Instagram/TikTok) com o link na bio. Postagem de "Bastidores da criação do site".
- **Semana 3-4**: Campanha de Google Ads Local (Raio de 5km de Poá/Cidade Kemel) com palavras-chave: "criação de sites poá", "desenvolvedor web cidade kemel".
- **Semana 5-6**: Ação de prospecção ativa. Abordar 10 comércios locais por dia no Instagram, oferecendo uma análise gratuita da presença digital deles, com link para o portfólio no site.
- **Semana 7-8**: Coleta de depoimentos em vídeo dos primeiros clientes e publicação no site e TikTok. Otimização de SEO baseada nos termos de busca reais que apareceram no Search Console.

### 3. 3 Dicas Rápidas de Teste Local
1. **Simulação de UTM**: Acesse `index.html?utm_source=instagram&utm_campaign=launch`. Clique no botão do WhatsApp. A mensagem pré-preenchida deve conter "Vim pelo site (instagram / launch)".
2. **Teste de LocalStorage**: Abra o DevTools (F12) > Application > Local Storage. Verifique se `theme`, `cookie_consent` e os rascunhos do formulário (`draft_name`, etc.) estão sendo salvos corretamente.
3. **Bloqueio de Cookies**: Abra uma aba anônima. O banner de cookies deve aparecer. Clique em "Rejeitar". Vá em Application > Cookies e verifique se nenhum cookie do `_ga` ou `_fbp` foi criado.