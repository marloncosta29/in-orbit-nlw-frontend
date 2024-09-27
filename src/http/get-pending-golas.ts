interface PendingGoal {
  id: string;
  title: string;
  desireWeeklyFrequency: number;
  completionsCount: number;
}

export async function getPendingGoals(): Promise<PendingGoal[]> {
  return fetch("http://localhost:3333/pending-goals")
    .then((res) => res.json())
    .then((data) => data.pendingGoals);
}
