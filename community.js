document.addEventListener("DOMContentLoaded", () => {
    const modeSelector = document.getElementById("modeSelector");
    const presetSelector = document.getElementById("presetSelector");
    const leaderboardTable = document.getElementById("leaderboardTable");
    const tableTimeElo = document.getElementById("tableTimeElo");
    const seedColumn = document.getElementById("seedColumn");

    // Fetch Presets
    const fetchPresets = async () => {
        try {
            const response = await fetch("http://35.208.162.255:8080/ranked/presets");
            const data = await response.json();
            const presets = data.presets; // Access the 'presets' key

            if (!Array.isArray(presets)) {
                throw new Error("Invalid presets format");
            }

            console.log("Presets:", presets); // Log the presets for debugging
            presets.forEach(preset => {
                const option = document.createElement("option");
                option.value = preset;
                option.textContent = preset;
                presetSelector.appendChild(option);
            });
            loadLeaderboard();
        } catch (error) {
            console.error("Error fetching presets:", error);
        }
    };

    // Load Leaderboard
    const loadLeaderboard = async () => {
        const mode = modeSelector.value;
        const preset = presetSelector.value;

        const endpoint = mode === "elo" ? `http://35.208.162.255:8080/leaderboards/elo/${preset}` : `http://35.208.162.255:8080/leaderboards/time/${preset}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();

            // Adjust table columns
            if (mode === "elo") {
                tableTimeElo.textContent = "Elo";
                seedColumn.classList.add("d-none");
            } else {
                tableTimeElo.textContent = "Time";
                seedColumn.classList.remove("d-none");
            }

            // Populate the table
            const rows = data.leaderboards.map(player => {
                if(player.seed_name === null){
                    player.seed_name = "Custom";
                    player.seed_url = "#";
                }
                const seedData = mode === "time" ? `<td><a href="${player.seed_url}" class="text-decoration-none text-info">${player.seed_name}</a></td>` : '';
                return `
                    <tr>
                        <td>${player.rank}</td>
                        <td>${player.username}</td>
                        <td>${mode === "elo" ? player.elo : player.time}</td>
                        ${seedData}
                    </tr>
                `;
            }).join('');

            leaderboardTable.innerHTML = rows || `<tr><td colspan="4" class="text-center">No data available</td></tr>`;
        } catch (error) {
            console.error("Error loading leaderboard:", error);
            leaderboardTable.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Failed to load leaderboard</td></tr>`;
        }
    };

    // Event Listeners
    modeSelector.addEventListener("change", loadLeaderboard);
    presetSelector.addEventListener("change", loadLeaderboard);

    // Initialize
    fetchPresets();
});
