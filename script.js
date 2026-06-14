// Registrar o Service Worker para o PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker Registrado!"));
}

// Lógica do botão "Não" fugir
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

// Evita clique no celular e força o botão a fugir ao toque
document.getElementById('btn-nao').addEventListener('touchstart', function(e) {
    e.preventDefault();
    fugirBotao();
});

// Transição para a tela de opções
function aceitou() {
    document.getElementById('tela-convite').classList.add('hidden');
    document.getElementById('tela-opcoes').classList.remove('hidden');
}

// Mostra ou esconde o Textarea de sugestão
function toggleSugestao(mostrar) {
    const container = document.getElementById('container-sugestao');
    if (mostrar) {
        container.classList.remove('hidden');
        document.getElementById('sugestao-texto').focus();
    } else {
        container.classList.add('hidden');
    }
}

// Envia a resposta final formatada para o WhatsApp
function enviarResposta() {
    const dataDefinida = document.getElementById('data').value;
    const roleSelecionado = document.querySelector('input[name="role"]:checked');

    if (!dataDefinida || !roleSelecionado) {
        alert("Escolhe uma data e o que quer fazer! Haha");
        return;
    }

    let atividadeFinal = roleSelecionado.value;

    if (roleSelecionado.value === "Outra coisa") {
        const textoSugestao = document.getElementById('sugestao-texto').value.trim();
        if (textoSugestao === "") {
            alert("Você escolheu sugerir algo, conta aí o que quer fazer! 😉");
            return;
        }
        atividadeFinal = `Outra coisa: ${textoSugestao}`;
    }

    const dataFormatada = dataDefinida.split('-').reverse().join('/');
    
    // Troque pelo seu número real com DDD (Ex: 5521999999999)
    const seuNumero = "5524999959066"; 
    
    const mensagem = `Oi! Aceitei o convite! 🥰%0A📅 Data: ${dataFormatada}%0A✨ Atividade: ${encodeURIComponent(atividadeFinal)}%0AFechado?`;
    
    window.open(`https://api.whatsapp.com/send?phone=${seuNumero}&text=${mensagem}`, '_blank');
}