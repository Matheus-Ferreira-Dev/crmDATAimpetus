import type { Cliente } from '@/types/crm'

export const useMockData = () => {
    const mockMetrics = {
        total: 23,
        interested: 15,
        newLeads: 9,
        locked: 2
    }

    const mockLeads: Partial<Cliente>[] = [
        {
            id: 'mock-lead-1',
            name: 'Isabella Rezende',
            remotejid: '5511987654321',
            is_qualified: true,
            qualificado: true,
            vertical: 'Lentes de Contato',
            Ativado: true,
            status_crm: 'qualificando',
            estagiokanbam: 'qualificando',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            metadata: {
                notes: 'Paciente referiu ver anúncio no Instagram. Altamente interessada em transformar o sorriso para o casamento em 3 meses.'
            }
        },
        {
            id: 'mock-lead-2',
            name: 'Carlos Albuquerque',
            remotejid: '5511976543210',
            is_qualified: true,
            qualificado: true,
            vertical: 'Implante Protocolo',
            Ativado: true,
            status_crm: 'agendado',
            estagiokanbam: 'agendado',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            metadata: {
                notes: 'Busca reabilitação oral completa. Agendado para avaliação amanhã às 14h.'
            }
        },
        {
            id: 'mock-lead-3',
            name: 'Carolina Almeida',
            remotejid: '5511965432109',
            is_qualified: false,
            qualificado: false,
            vertical: 'Invisalign',
            Ativado: false,
            trava: true,
            status_crm: 'contato',
            estagiokanbam: 'contato',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
            metadata: {
                notes: 'Aguardando aprovação de crédito para fechar o tratamento ortodôntico.'
            }
        },
        {
            id: 'mock-lead-4',
            name: 'Dr. Fernando Mello',
            remotejid: '5511954321098',
            is_qualified: true,
            qualificado: true,
            vertical: 'Lentes de Contato',
            Ativado: true,
            status_crm: 'qualificado',
            estagiokanbam: 'qualificado',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
            metadata: {
                notes: 'Fechou 10 elementos superiores (Lentes em Emax). Pagamento via PIX.'
            }
        },
        {
            id: 'mock-lead-5',
            name: 'Roberto Junqueira',
            remotejid: '5511943210987',
            is_qualified: false,
            qualificado: false,
            vertical: 'Implante Unitário',
            Ativado: true,
            status_crm: 'novo',
            estagiokanbam: 'novo',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            metadata: {
                notes: 'Perdeu um dente posterior jogando tênis. Quer agilidade.'
            }
        },
        {
            id: 'mock-lead-6',
            name: 'Mariana Costa',
            remotejid: '5511932109876',
            is_qualified: false,
            qualificado: false,
            vertical: 'Clareamento',
            Ativado: true,
            status_crm: 'novo',
            estagiokanbam: 'novo',
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            metadata: {
                notes: 'Primeiro contato via Google Ads. Quer saber preço de clareamento.'
            }
        },
        {
            id: 'mock-lead-7',
            name: 'Pedro Henrique Silva',
            remotejid: '5511921098765',
            is_qualified: true,
            qualificado: true,
            vertical: 'Implante Protocolo',
            Ativado: true,
            status_crm: 'Engajado',
            estagiokanbam: 'Engajado',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
            metadata: {
                notes: 'Veio indicado por Carlos Albuquerque. Interessado em protocolo inferior.'
            }
        }
    ]

    const mockChats = {
        'mock-lead-1': [
            { id: '1', role: 'user', content: 'Olá, vi o anúncio no Instagram sobre as lentes de contato dental. Quanto custa?', created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
            { id: '2', role: 'assistant', content: 'Olá, Isabella! 😊 Que bom falar com você! As Lentes de Contato Dental são realmente transformadoras. O investimento varia conforme a quantidade de dentes e o material escolhido (porcelana ou resina). Na nossa clínica, trabalhamos com Lentes em E-max, que é o padrão premium do mercado.\n\nPara te dar um valor exato, precisamos de uma avaliação com nosso especialista. Posso te perguntar: quantos dentes você gostaria de tratar?', created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString() },
            { id: '3', role: 'user', content: 'Queria fazer na frente inteira mesmo, os dentes de cima. Meu casamento é em 3 meses e acho meu sorriso amarelado e com espaços entre os dentes.', created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString() },
            { id: '4', role: 'assistant', content: 'Entendo perfeitamente, Isabella! Para noivas, temos um protocolo especial chamado "Smile Design Bridal" 💍\n\nO tratamento com 10 lentes superiores geralmente fica entre R$ 15.000 e R$ 22.000, dependendo do caso. E o melhor: em 3 meses dá tempo sim!\n\nNosso processo:\n1. Avaliação + Escaneamento Digital (1ª consulta)\n2. Mock-up Digital — você vê o resultado ANTES\n3. Preparação + Cimentação\n\nTemos horários disponíveis na quinta e sexta. Qual funciona melhor pra você?', created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
            { id: '5', role: 'user', content: 'Que legal! Quinta à tarde seria bom, depois das 15h.', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
            { id: '6', role: 'assistant', content: 'Perfeito! Vou reservar o horário de quinta às 15h30 para sua Avaliação Premium com o Dr. Especialista. 📋\n\nA consulta dura cerca de 40 minutos e já saímos com o planejamento digital do seu novo sorriso.\n\nVou te enviar a confirmação com endereço e orientações. Qualquer dúvida antes da consulta, é só me chamar aqui! 😊', created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
        ],
        'mock-lead-2': [
            { id: '1', role: 'user', content: 'Bom dia, fazem implante protocolo? Qual o valor?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString() },
            { id: '2', role: 'assistant', content: 'Bom dia, Carlos! Sim, somos referência em Implantodontia Avançada e Protocolos. 🦷\n\nO Protocolo é o tratamento mais completo para quem usa prótese total ou está perdendo muitos dentes. São implantes de titânio + uma prótese fixa parafusada.\n\nO investimento varia entre R$ 25.000 e R$ 45.000 por arcada, dependendo do material da prótese (acrílica ou em zircônia) e da quantidade de implantes necessários.\n\nVocê usa prótese removível atualmente? Tem sentido algum desconforto?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
            { id: '3', role: 'user', content: 'Uso prótese sim, é terrível. Machuca demais e fica solta na hora de comer. Já passei em 3 dentistas mas nenhum me passou confiança.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
            { id: '4', role: 'assistant', content: 'Sinto muito que você esteja passando por isso, Carlos. Sei como é frustrante não se sentir seguro ao comer e sorrir. 😔\n\nO Protocolo Fixo vai devolver 100% da sua força mastigatória e conforto. Na nossa clínica, fazemos a tomografia computadorizada aqui mesmo e o planejamento é totalmente digital.\n\nTemos mais de 200 casos de protocolo realizados com sucesso. Posso te enviar alguns depoimentos de pacientes?\n\nE o mais importante: gostaria de marcar uma avaliação sem compromisso? Temos horários amanhã à tarde.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString() },
            { id: '5', role: 'user', content: 'Pode sim, amanhã às 14h ficaria bom.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString() },
            { id: '6', role: 'assistant', content: 'Agendado! ✅ Amanhã às 14h com o Dr. Especialista.\n\nEndereço: [endereço da clínica]\n\nTraga exames recentes se tiver (panorâmica, tomografia). Se não tiver, fazemos aqui mesmo.\n\nQualquer dúvida, estou por aqui. Até amanhã, Carlos! 🤝', created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString() },
        ],
        'mock-lead-3': [
            { id: '1', role: 'user', content: 'Oi, boa noite! Quanto fica o Invisalign aí na clínica?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString() },
            { id: '2', role: 'assistant', content: 'Boa noite, Carolina! 😊 O Invisalign é uma excelente escolha para alinhar os dentes de forma discreta.\n\nO valor depende da complexidade do caso:\n• Invisalign Express (casos leves): R$ 6.000 – R$ 9.000\n• Invisalign Comprehensive (casos moderados/complexos): R$ 12.000 – R$ 18.000\n\nVocê já fez alguma avaliação ortodôntica anteriormente? O que mais te incomoda no sorriso?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString() },
            { id: '3', role: 'user', content: 'Tenho os dentes da frente meio tortos. Nunca usei aparelho. Tem como parcelar? Tá apertado financeiramente.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
            { id: '4', role: 'assistant', content: 'Entendo, Carolina! Sim, temos condições especiais de pagamento:\n\n💳 Parcelamos em até 24x no cartão\n📋 Também trabalhamos com financiamento via BV Financeira com aprovação em 24h\n\nPara casos mais simples como o seu (desalinhamento frontal), o Invisalign Express pode ser suficiente, e o investimento fica bem mais acessível.\n\nQuer agendar uma avaliação gratuita? Fazemos o escaneamento 3D e já te mostramos uma simulação do resultado final! Temos horário na terça ou quarta.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 47).toISOString() },
            { id: '5', role: 'user', content: 'Hmm vou ver aqui com meu marido primeiro sobre a questão do crédito. Depois te falo.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 46).toISOString() },
            { id: '6', role: 'assistant', content: 'Claro, Carolina! Fique à vontade. 🤗\n\nQuando decidir, é só me chamar aqui que reservo um horário pra você. A avaliação é sem compromisso e totalmente gratuita.\n\nAh, e se quiser já ir adiantando, posso te enviar o link da simulação de crédito pra vocês analisarem com calma. Quer que eu mande?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString() },
        ],
        'mock-lead-4': [
            { id: '1', role: 'user', content: 'Dr. Fernando Mello aqui. Preciso de lentes de contato dental para 10 dentes superiores. Material E-max. Já tenho experiência com o procedimento.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 75).toISOString() },
            { id: '2', role: 'assistant', content: 'Olá, Dr. Fernando! 🦷 Prazer em atendê-lo.\n\nPor já conhecer o procedimento, vou ser direto:\n\n• 10 Lentes E-max superiores\n• Investimento: R$ 19.500 (condição especial para profissionais da saúde)\n• Inclusos: Planejamento digital DSD + Mock-up + Provisórios\n• Prazo: 3 consultas em ~4 semanas\n\nTrabalharemos com o enceramento digital no Exocad. Alguma preferência de cor? Temos usado muito o BL2 e o A1 para um resultado natural.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 74).toISOString() },
            { id: '3', role: 'user', content: 'Excelente. Prefiro A1, quero um resultado natural e não "tictac". Pagamento via PIX tem desconto?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 73).toISOString() },
            { id: '4', role: 'assistant', content: 'Perfeita escolha, Dr. Fernando! A1 com acabamento natural é realmente o mais elegante. 👌\n\nPIX à vista: R$ 17.800 (desconto de ~9%)\n\nSe preferir, também fazemos:\n• 2x PIX: R$ 9.250 cada\n• 3x cartão: sem juros\n\nQuando podemos começar? Tenho disponibilidade na próxima semana para a primeira consulta (moldagem digital + fotos).', created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() },
            { id: '5', role: 'user', content: 'Vou de PIX à vista. Pode ser segunda-feira que vem, período da manhã.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 71).toISOString() },
            { id: '6', role: 'assistant', content: 'Fechado! ✅\n\n📅 Segunda-feira, 9h — 1ª consulta\n💰 PIX à vista: R$ 17.800\n🦷 10 Lentes E-max cor A1\n\nVou enviar o comprovante de agendamento e os dados PIX por aqui. Também envio o termo de consentimento para agilizar.\n\nSeja muito bem-vindo, Dr. Fernando! Será um prazer cuidar do seu sorriso. 🤝', created_at: new Date(Date.now() - 1000 * 60 * 60 * 70).toISOString() },
        ],
        'mock-lead-5': [
            { id: '1', role: 'user', content: 'Boa tarde, perdi um dente jogando tênis. Vocês fazem implante?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
            { id: '2', role: 'assistant', content: 'Boa tarde, Roberto! Sim, fazemos implantes unitários. Lamento pelo ocorrido! 😬\n\nComo foi a perda? O dente saiu inteiro ou fraturou? E qual dente foi?\n\nEssas informações me ajudam a orientar melhor sobre o tratamento e urgência.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
            { id: '3', role: 'user', content: 'Foi o segundo pré-molar inferior esquerdo. Saiu inteiro com a raiz. Tá doendo bastante.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
            { id: '4', role: 'assistant', content: 'Entendo. Roberto, nesse caso é importante ser atendido o mais rápido possível. Se o alvéolo (local do dente) estiver limpo, existe a possibilidade de fazermos um implante imediato — na mesma sessão da avaliação!\n\nO implante unitário fica entre R$ 4.500 e R$ 7.000 (implante + coroa).\n\nConsigo encaixar uma emergência pra amanhã de manhã. Quer que eu reserve?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        ],
        'mock-lead-6': [
            { id: '1', role: 'user', content: 'Oi, vi o anúncio no Google sobre clareamento dental. Faz presencial mesmo? Qual o preço?', created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
            { id: '2', role: 'assistant', content: 'Olá, Mariana! Sim, fazemos clareamento presencial aqui na clínica! 😁\n\nTemos duas modalidades:\n\n🏥 Clareamento em Consultório (laser): R$ 1.200 – R$ 1.800\n   → Resultado imediato em 1 sessão (~1h)\n\n🏠 Clareamento Caseiro (moldeira personalizada): R$ 800 – R$ 1.200\n   → Resultado gradual em 2–3 semanas\n\n💎 Combo (consultório + caseiro): R$ 1.600 – R$ 2.200\n   → Melhor resultado e mais duradouro\n\nAlguma preferência? Se quiser, posso agendar uma avaliação rápida para verificar a saúde dos seus dentes e recomendar o melhor protocolo pra você.', created_at: new Date(Date.now() - 1000 * 60 * 32).toISOString() },
            { id: '3', role: 'user', content: 'O combo parece bom! Mas queria saber: dói muito? Tenho medo de sensibilidade.', created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
            { id: '4', role: 'assistant', content: 'Ótima pergunta, Mariana! A sensibilidade é uma preocupação muito comum, mas fique tranquila. 🤗\n\nNós usamos gel dessensibilizante antes e depois do procedimento, o que reduz bastante qualquer desconforto. A grande maioria dos pacientes relata apenas uma sensibilidade leve que passa em 24–48h.\n\nAlém disso, na avaliação verificamos se há alguma cárie ou gengivite que precise ser tratada antes — isso garante um clareamento seguro e sem dor.\n\nQuer agendar? Tenho horário amanhã ou quinta. A avaliação inicial é gratuita! 📋', created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
        ],
        'mock-lead-7': [
            { id: '1', role: 'user', content: 'Oi, o Carlos Albuquerque me indicou vocês. Ele fez protocolo aí e disse que ficou ótimo. Quero fazer também, mas só na parte de baixo.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString() },
            { id: '2', role: 'assistant', content: 'Olá, Pedro Henrique! Que bom receber sua mensagem! O Carlos é um paciente muito especial pra nós. 🤝\n\nProtocolo inferior é sim possível! Geralmente precisamos de 4 a 6 implantes na mandíbula, dependendo da anatomia óssea.\n\nO investimento para o protocolo inferior fica entre R$ 25.000 e R$ 38.000, incluindo os implantes + prótese fixa.\n\nVocê usa prótese removível hoje ou ainda tem alguns dentes na parte de baixo?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
            { id: '3', role: 'user', content: 'Ainda tenho uns 4 dentes mas estão todos moles, o dentista falou que vou perder todos em breve. Quero resolver logo antes que caiam sozinhos.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString() },
            { id: '4', role: 'assistant', content: 'Entendo a urgência, Pedro Henrique. Nesses casos é realmente melhor antecipar o tratamento. 💪\n\nO procedimento funciona assim:\n1. Extraímos os dentes comprometidos\n2. Instalamos os implantes no mesmo dia\n3. Colocamos uma prótese provisória fixa imediata\n4. Após 4–6 meses, instalamos a prótese definitiva\n\nOu seja, você não fica nenhum dia sem dentes! 🦷\n\nComo o Carlos te indicou, temos uma condição especial de indicação. Posso te passar os detalhes na avaliação.\n\nTemos horário na quarta ou sexta pra uma consulta completa com tomografia. Qual prefere?', created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString() },
            { id: '5', role: 'user', content: 'Sexta seria melhor pra mim. Período da tarde, se possível.', created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString() },
            { id: '6', role: 'assistant', content: 'Reservado! 📅 Sexta às 14h30 — Avaliação completa com tomografia.\n\nVou preparar tudo para que o Dr. já faça o planejamento digital no mesmo dia. Assim você já sai com uma previsão clara do tratamento, prazos e valores.\n\nDica: não precisa estar em jejum, mas evite café 1h antes (por causa da tomografia).\n\nQualquer dúvida, é só chamar! Até sexta, Pedro Henrique! 😊', created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
        ]
    }

    const mockSummaries: Record<string, string> = {
        'mock-lead-1': '📋 **Resumo da Conversa — Isabella Rezende**\n\n• Interesse: Lentes de Contato Dental (10 elementos superiores)\n• Motivação: Casamento em 3 meses, deseja sorriso natural\n• Queixas: Dentes amarelados e espaçados\n• Valor apresentado: R$ 15.000 – R$ 22.000\n• Status: Consulta AGENDADA para quinta às 15h30\n• Temperatura: 🔥 Quente — alta intenção de fechamento\n• Próximo passo: Avaliação Premium + Mock-up Digital',
        'mock-lead-2': '📋 **Resumo da Conversa — Carlos Albuquerque**\n\n• Interesse: Implante Protocolo (arcada completa)\n• Motivação: Prótese removível machuca e fica solta\n• Histórico: Já passou em 3 dentistas sem decisão\n• Valor apresentado: R$ 25.000 – R$ 45.000/arcada\n• Status: Consulta AGENDADA para amanhã às 14h\n• Temperatura: 🔥 Quente — paciente com dor\n• Próximo passo: Tomografia + plano de tratamento',
        'mock-lead-3': '📋 **Resumo da Conversa — Carolina Almeida**\n\n• Interesse: Invisalign (desalinhamento frontal)\n• Motivação: Estética — nunca usou aparelho\n• Objeção: Financeira — precisa consultar marido sobre crédito\n• Valor apresentado: R$ 6.000 – R$ 18.000 (Express ou Comprehensive)\n• Status: AGUARDANDO retorno da paciente\n• Temperatura: ⚠️ Morno — interesse existe, barreira financeira\n• Próximo passo: Follow-up em 3 dias, enviar link de simulação de crédito',
        'mock-lead-4': '📋 **Resumo da Conversa — Dr. Fernando Mello**\n\n• Interesse: 10 Lentes E-max superiores (cor A1)\n• Perfil: Profissional da saúde, conhece o procedimento\n• Pagamento: PIX à vista — R$ 17.800\n• Status: FECHADO ✅ — 1ª consulta segunda 9h\n• Temperatura: 🔥🔥 Quente — deal fechado\n• Próximo passo: Enviar dados PIX + termo de consentimento',
        'mock-lead-5': '📋 **Resumo da Conversa — Roberto Junqueira**\n\n• Interesse: Implante Unitário (2º pré-molar inferior esquerdo)\n• Motivação: Perda traumática durante esporte\n• Situação: Urgência — dente avulsionado com dor\n• Valor apresentado: R$ 4.500 – R$ 7.000\n• Status: Aguardando confirmação para emergência\n• Temperatura: 🔥 Quente — urgência médica\n• Próximo passo: Avaliação de emergência + possível implante imediato',
        'mock-lead-6': '📋 **Resumo da Conversa — Mariana Costa**\n\n• Interesse: Clareamento Dental (combo consultório + caseiro)\n• Motivação: Estética — primeiro contato via Google Ads\n• Preocupação: Sensibilidade pós-procedimento\n• Valor apresentado: R$ 1.600 – R$ 2.200 (combo)\n• Status: AGUARDANDO agendamento\n• Temperatura: ⚠️ Morno — interessada mas ainda não agendou\n• Próximo passo: Confirmar agendamento da avaliação gratuita',
        'mock-lead-7': '📋 **Resumo da Conversa — Pedro Henrique Silva**\n\n• Interesse: Implante Protocolo Inferior\n• Indicação: Carlos Albuquerque (paciente existente)\n• Situação: 4 dentes remanescentes com mobilidade\n• Valor apresentado: R$ 25.000 – R$ 38.000\n• Status: Consulta AGENDADA para sexta às 14h30\n• Temperatura: 🔥 Quente — urgência + indicação confiável\n• Próximo passo: Tomografia + planejamento digital',
    }

    const mockWeeklyMetrics: Record<string, any> = {
        'semana-1': { totalLeads: 8, qualificados: 3, agendamentos: 2, convertidos: 1, taxaConversao: 12.5, tempoMedioResposta: '4min', receita: 17800, novosContatos: 5 },
        'semana-2': { totalLeads: 6, qualificados: 2, agendamentos: 3, convertidos: 2, taxaConversao: 33.3, tempoMedioResposta: '3min', receita: 42000, novosContatos: 4 },
        'semana-3': { totalLeads: 5, qualificados: 4, agendamentos: 4, convertidos: 1, taxaConversao: 20.0, tempoMedioResposta: '2min', receita: 22000, novosContatos: 3 },
        'semana-4': { totalLeads: 4, qualificados: 2, agendamentos: 1, convertidos: 0, taxaConversao: 0, tempoMedioResposta: '5min', receita: 0, novosContatos: 2 },
    }

    const mockActivityLog = [
        { id: '1', type: 'deal_closed', text: 'Dr. Fernando Mello fechou 10 Lentes E-max — R$ 17.800 (PIX à vista)', time: new Date(Date.now() - 1000 * 60 * 30).toISOString(), week: 'semana-1' },
        { id: '2', type: 'meeting_scheduled', text: 'Isabella Rezende agendou Avaliação Premium — quinta 15h30', time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), week: 'semana-1' },
        { id: '3', type: 'lead_qualified', text: 'Carlos Albuquerque qualificado para Protocolo — alto interesse', time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), week: 'semana-1' },
        { id: '4', type: 'ai_action', text: 'IA enviou follow-up para Carolina Almeida (Invisalign)', time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), week: 'semana-1' },
        { id: '5', type: 'lead_new', text: 'Mariana Costa entrou via Google Ads — Clareamento Dental', time: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), week: 'semana-1' },
        { id: '6', type: 'meeting_scheduled', text: 'Pedro Henrique Silva agendou avaliação — sexta 14h30', time: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), week: 'semana-1' },
        { id: '7', type: 'lead_qualified', text: 'Roberto Junqueira identificado como urgência — implante imediato', time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), week: 'semana-1' },
        { id: '8', type: 'deal_closed', text: 'Protocolo inferior finalizado para paciente indicado — R$ 32.000', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), week: 'semana-2' },
        { id: '9', type: 'meeting_scheduled', text: '3 avaliações agendadas para clareamento via campanha Instagram', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(), week: 'semana-2' },
        { id: '10', type: 'ai_action', text: 'IA reativou 2 leads inativos com mensagem de follow-up', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), week: 'semana-2' },
        { id: '11', type: 'lead_new', text: '4 novos leads entraram via campanha Google Ads "Implantes"', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(), week: 'semana-2' },
        { id: '12', type: 'deal_closed', text: 'Lentes de contato 6 elementos para Dra. Patrícia — R$ 10.000', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), week: 'semana-2' },
        { id: '13', type: 'lead_qualified', text: '4 leads qualificados na semana — recorde do mês', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(), week: 'semana-3' },
        { id: '14', type: 'meeting_scheduled', text: 'Semana com 4 agendamentos — taxa de show de 75%', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17).toISOString(), week: 'semana-3' },
        { id: '15', type: 'ai_action', text: 'IA identificou padrão: leads de Instagram convertem 40% mais rápido', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(), week: 'semana-3' },
        { id: '16', type: 'lead_new', text: '2 novos leads entraram — baixa captação na semana', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(), week: 'semana-4' },
        { id: '17', type: 'ai_action', text: 'IA sugeriu aumentar budget de ads — queda de 50% nos leads', time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23).toISOString(), week: 'semana-4' },
    ]

    const mockWeeklyReports: Record<string, any> = {
        'semana-1': {
            title: 'Semana 24 Fev – 02 Mar',
            resumo: 'Semana forte com 1 fechamento de alto ticket (Lentes E-max R$ 17.800). Pipeline aquecido com 3 qualificados. Destaque para leads de Instagram com alta conversão.',
            destaques: [
                '🏆 Fechamento Dr. Fernando Mello — R$ 17.800 PIX à vista',
                '📈 3 leads qualificados na semana (+50% vs semana anterior)',
                '📅 2 agendamentos confirmados para próxima semana',
            ],
            conselhos: [
                'Isabella Rezende tem casamento em 3 meses — priorize o agendamento rápido para não perder timing',
                'Carlos Albuquerque já passou em 3 dentistas. Na avaliação, foque em mostrar diferenciais (tecnologia, cases de sucesso)',
                'Carolina Almeida tem barreira financeira — envie simulação de crédito BV Financeira em até 48h',
                'Roberto Junqueira é urgência. Se não confirmar emergência até amanhã, ligar manualmente',
            ],
            alertas: [
                '⚠️ Carolina Almeida não respondeu há 2 dias — risco de esfriar',
                '⚠️ Mariana Costa perguntou sobre sensibilidade mas não agendou — follow-up necessário',
            ],
        },
        'semana-2': {
            title: 'Semana 17 – 23 Fev',
            resumo: 'Melhor semana do mês! 2 conversões com receita de R$ 42.000. Campanha "Implantes" no Google gerou 4 leads novos. Taxa de agendamento de 50% acima da média.',
            destaques: [
                '🏆 2 fechamentos totalizando R$ 42.000 em receita',
                '📈 Campanha Google "Implantes" gerou 4 leads quentes',
                '📅 3 agendamentos na semana — todos confirmados',
            ],
            conselhos: [
                'Manter orçamento da campanha "Implantes" — ROI positivo de 8x',
                'Leads de implante convertem melhor quando atendidos em menos de 2h — monitorar SLA',
                'Considerar criar campanha segmentada para "Lentes de Contato" — demanda crescente',
            ],
            alertas: [
                '⚠️ 1 lead não atendido em 24h — melhorar tempo de resposta',
            ],
        },
        'semana-3': {
            title: 'Semana 10 – 16 Fev',
            resumo: 'Semana focada em qualificação com 4 leads qualificados (recorde). Porém, apenas 1 conversão efetivada. Necessário melhorar a ponte entre qualificação e fechamento.',
            destaques: [
                '🏆 4 leads qualificados — recorde mensal',
                '📊 IA identificou: Instagram converte 40% mais rápido que Google',
                '📅 4 agendamentos com 75% de comparecimento',
            ],
            conselhos: [
                'Muitos qualificados mas poucos fechamentos — reforçar script de fechamento na avaliação presencial',
                'A taxa de show de 75% é boa, mas enviar lembrete 2h antes pode elevar para 85%+',
                'Investir mais em Instagram Ads — dados mostram melhor performance vs Google neste período',
            ],
            alertas: [
                '⚠️ Gap entre qualificação e conversão — revisar processo de proposta',
            ],
        },
        'semana-4': {
            title: 'Semana 03 – 09 Fev',
            resumo: 'Semana fraca com apenas 2 novos leads e nenhuma conversão. Queda significativa pode estar relacionada a mudança no algoritmo de ads ou sazonalidade (Carnaval).',
            destaques: [
                '📊 IA sugeriu aumento de budget — captação caiu 50%',
                '🔍 Análise indica sazonalidade como fator principal',
            ],
            conselhos: [
                'URGENTE: Aumentar budget de ads em pelo menos 30% para compensar queda',
                'Criar campanha específica pós-Carnaval com ofertas de "volta às consultas"',
                'Reativar base de leads antigos com oferta especial — IA pode automatizar envio',
                'Considerar parceria com influenciadores locais para gerar tráfego orgânico',
            ],
            alertas: [
                '🚨 Nenhuma conversão na semana — atenção máxima',
                '⚠️ Apenas 2 leads novos — volume abaixo do mínimo aceitável',
            ],
        },
    }

    const mockChartData: Record<string, any> = {
        funnel: [
            { label: 'Novos', value: 23, color: '#3B82F6' },
            { label: 'Contato', value: 15, color: '#60A5FA' },
            { label: 'Qualificados', value: 11, color: '#2563EB' },
            { label: 'Agendados', value: 10, color: '#1D4ED8' },
            { label: 'Convertidos', value: 4, color: '#1E40AF' },
        ],
        weeklyTrend: [
            { week: 'Sem 1', leads: 4, conversoes: 0 },
            { week: 'Sem 2', leads: 5, conversoes: 1 },
            { week: 'Sem 3', leads: 6, conversoes: 2 },
            { week: 'Sem 4', leads: 8, conversoes: 1 },
        ],
    }

    return {
        mockMetrics,
        mockLeads,
        mockChats,
        mockSummaries,
        mockWeeklyMetrics,
        mockActivityLog,
        mockWeeklyReports,
        mockChartData
    }
}
