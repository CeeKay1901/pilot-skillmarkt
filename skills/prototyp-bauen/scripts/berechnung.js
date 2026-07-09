// Vorlage: Live-Berechnung an Eingabefelder hängen
function bindLiveCalc(inputIds, compute, outEl) {
  const read = () => inputIds.map(id =>
    parseFloat(document.getElementById(id).value) || 0
  );
  const update = () => { outEl.textContent = compute(...read()); };
  inputIds.forEach(id =>
    document.getElementById(id).addEventListener('input', update)
  );
  update(); // initial
}

// Beispiel TKP-Rechner:
// bindLiveCalc(['reach','tkp'], (r, t) => (r/1000*t).toFixed(2) + ' €', out);
