document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get("id");

  if (!clientId) {
    document.body.innerHTML = "<h2>Please provide a client ID in the URL.</h2>";
    return;
  }

  try {
    const response = await fetch("/data/clients.json");

    const clients = await response.json();

    if (clients[clientId]) {
      document.getElementById("presentation").innerHTML = `
                <iframe src="${clients[clientId]}" allowfullscreen></iframe>
            `;
    } else {
      document.body.innerHTML = `<h2>No presentation found for Client ID: ${clientId}</h2>`;
    }
  } catch (error) {
    console.error("Error loading client data", error);
    document.body.innerHTML = "<h2>Failed to load client presentations.</h2>";
  }
});
