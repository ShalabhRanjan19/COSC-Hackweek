async function searchWord() {
  const word = document.getElementById('wordInput').value;
  const defBox = document.getElementById('definition');
  defBox.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data[0]) {
      const meanings = data[0].meanings[0].definitions[0].definition;
      defBox.innerHTML = `<strong>${word}</strong>: ${meanings}`;
    } else {
      defBox.innerHTML = "Definition not found!";
    }
  } catch (error) {
    defBox.innerHTML = "Error fetching definition.";
  }
}
