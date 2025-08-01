const regras = {
    cript: { a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat' },
    descript: { enter: 'e', imes: 'i', ober: 'o', ufat: 'u', ai: 'a' }
};

function processar(texto, tipo) {
    if (tipo === 'cript') texto = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return Object.entries(regras[tipo]).reduce((acc, [k, v]) => acc.replace(new RegExp(k, 'g'), v), texto);
}

function mostrarResultado(texto) {
    document.querySelector('.resultado').innerHTML = texto.trim() ? 
        `<div class="texto-resultado">
            <textarea readonly class="resultado-texto">${texto}</textarea>
            <button class="botao-copiar" onclick="copiar()">Copiar</button>
        </div>` :
        `<img class="desenho" src="./img/desenho.svg" alt="Mulher olhando diamante">
        <div class="duasmensagens">
            <div class="mensagem1"><p>Nenhuma mensagem <br> encontrada</p></div>
            <div class="mensagem2"><p>Digite um texto que você deseja <br> criptografar ou descriptografar.</p></div>
        </div>`;
}

function copiar() {
    const texto = document.querySelector('.resultado-texto');
    navigator.clipboard.writeText(texto.value);
    const btn = document.querySelector('.botao-copiar');
    btn.textContent = 'Copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 2000);
}

function executar(acao) {
    const input = document.querySelector('.textinho');
    const texto = input.value;
    
    if (!texto.trim()) return alert('Digite um texto!');
    if (acao === 'cript' && !/^[a-z\s]*$/.test(texto)) return alert('Use apenas letras minúsculas!');
    
    mostrarResultado(processar(texto, acao));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.boliadinho').addEventListener('submit', e => e.preventDefault());
    document.querySelector('.botao1 button').addEventListener('click', e => {e.preventDefault(); executar('cript');});
    document.querySelector('.botao2 button').addEventListener('click', e => {e.preventDefault(); executar('descript');});
    document.querySelector('.textinho').addEventListener('input', e => !e.target.value.trim() && mostrarResultado(''));
});
