import { useNotificationDispatch } from "../context/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNew } from "../request";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: "SET",
        payload: `too short anecdote, must have length 5 or more`,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = {
      content,
      votes: 0,
    };
    newAnecdoteMutation.mutate(newAnecdote);
    dispatch({
      type: "SET",
      payload: `you created a new anecdote: ${newAnecdote.content}`,
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
