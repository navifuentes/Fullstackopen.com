import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAnecdotes, updateVote } from "./request";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const updateNoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) =>
          a.id !== updatedAnecdote.id ? a : updatedAnecdote
        )
      );
    },
  });

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (result.isLoading) {
    return <div>loading data ....</div>;
  }
  if (result.isError) {
    return (
      <div>anecdote service not avaible due to problems in the server</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
