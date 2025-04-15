(function() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '10px';
  container.style.right = '10px';
  container.style.background = '#fff';
  container.style.border = '1px solid #ccc';
  container.style.padding = '10px';
  container.style.zIndex = 9999;

  // Botão de exportar
  const exportBtn = document.createElement('button');
  exportBtn.textContent = 'Salvar localStorage';
  exportBtn.onclick = () => {
    const filename = prompt('Digite um nome para o arquivo:', 'localStorage-backup');
    if (!filename) return;
    const dataStr = JSON.stringify(localStorage, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Botão de importar
  const importBtn = document.createElement('button');
  importBtn.textContent = 'Carregar localStorage';
  importBtn.onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          for (let key in data) {
            localStorage.setItem(key, data[key]);
          }
          alert('localStorage carregado com sucesso!');
        } catch (err) {
          alert('Erro ao importar JSON');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  exportBtn.style.marginRight = '10px';
  container.appendChild(exportBtn);
  container.appendChild(importBtn);
  document.body.appendChild(container);
})();
