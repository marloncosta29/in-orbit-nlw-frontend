export async function createGoalComplete(goalId: string) {
  return fetch("http://localhost:3333/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goalId }),
  });
}
