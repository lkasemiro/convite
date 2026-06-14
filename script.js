// Registrar o Service Worker para o PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker Registrado!"));
}

// LÓGICA DO SCROLL: Transforma o blog de turismo no convite conforme ela desce a página
window.addEventListener('scroll', function() {
    const convite = document.getElementById('convite-revelado');
    const conteudoTurismo = document.getElementById('conteudo-turismo');
    
    // Altura total da página disponível para scroll
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    // O quanto ela já scrollou atualmente
    const atualScroll = window.scrollY;

    // Quando ela rolar mais de 45% da página do blog, engatilha a transição sutil
    if ((atualScroll / totalScroll) > 0.45) {
        convite.classList.add('reveal-active');
        conteudoTurismo.classList.add('fade-out-blog');
    }
});

// Lógica do botão "Não" fugir da tela
function fugirBotao() {
    const btnNao = document.getElementById('btn-nao');
    const x = Math.random() * (window.innerWidth - btnNao.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - btnNao.offsetHeight - 20);
    btnNao.style.position = 'fixed';
    btnNao.style.left = `${x}px`;
    btnNao.style.top = `${y}px`;
}

function clicouNoNao() {
    alert("Kkkk isso não é um botão de verdade... Tente o outro! 😉");
}

// Evita o clique no celular e força o botão a fugir instantaneamente ao toque
document.getElementById('btn-nao').addEventListener('touchstart', function(e) {
    e.preventDefault();
    fugirBotao();
});

// Transição interna: sai do convite e abre o formulário de opções
function aceitou() {
    document.getElementById('tela-convite').classList.add('hidden');
    document.getElementById('tela-opcoes').classList.remove('hidden');
}

// Mostra ou esconde o Textarea de sugestão dependendo do radio clicado
function toggleSugestao(mostrar) {
    const container = document.getElementById('container-sugestao');
    if (mostrar) {
        container.classList.remove('hidden');
        document.getElementById('sugestao-texto').focus();
    } else {
        container.classList.add('hidden');
    }
}

// Envia a resposta final formatada para o seu WhatsApp
function enviarResposta() {
    const dataDefinida = document.getElementById('data').value;
    const roleSelecionado = document.querySelector('input[name="role"]:checked');

    if (!dataDefinida || !roleSelecionado) {
        alert("Escolhe uma data e o que quer fazer! Haha");
        return;
    }

    let atividadeFinal = roleSelecionado.value;

    // Se ela escolheu "Outra coisa", valida e puxa o texto do textarea
    if (roleSelecionado.value === "Outra coisa") {
        const textoSugestao = document.getElementById('sugestao-texto').value.trim();
        if (textoSugestao === "") {
            alert("Você escolheu sugerir algo, conta aí o que quer fazer! 😉");
            return;
        }
        atividadeFinal = `Outra coisa: ${textoSugestao}`;
    }

    // Formata a data de AAAA-MM-DD para DD/MM/AAAA
    const dataFormatada = dataDefinida.split('-').reverse().join('/');
    
    // Seu número de destino definido
    const seuNumero = "5524999959066"; 
    
    // Monta o template da mensagem e codifica a atividade (caso ela tenha escrito textão)
    const mensagem = `Oi! Aceitei o convite! 🥰%0A📅 Data: ${dataFormatada}%0A✨ Atividade: ${encodeURIComponent(atividadeFinal)}%0AFechado?`;
    
    window.open(`https://api.whatsapp.com/send?phone=${seuNumero}&text=${mensagem}`, '_blank');
}