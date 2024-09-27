interface SummatyResponse {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    {
      id: string;
      title: string;
      completedAt: string;
    }[]
  >;
}

export async function getSummary(): Promise<SummatyResponse> {
  return fetch("http://localhost:3333/summary")
    .then((res) => res.json())
    .then((data) => {
      return data.summary;
    });
}
