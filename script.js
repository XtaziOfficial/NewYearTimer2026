function updateTimer() {
  const newYear = new Date("January 1, 2026 00:00:00").getTime();
  const now = new Date().getTime();
  const diff = newYear - now;

  const timerDiv = document.getElementById("timer");
  if (!timerDiv) return;

  if (diff <= 0) {
    timerDiv.textContent = "С Новым Годом!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerDiv.textContent = `${String(days).padStart(2, "0")}д ${String(hours).padStart(2, "0")}ч ${String(minutes).padStart(2, "0")}м ${String(seconds).padStart(2, "0")}с`;
}

setInterval(updateTimer, 1000);
updateTimer();
