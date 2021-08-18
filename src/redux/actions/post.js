export const AddPosts = content => ({
  type: "ADD_POST",
  content,
});

export const EditPost = (content, id) => ({
  type: "EDIT_POST",
  content,
  id,
});

export const DeletePost = id => ({
  type: "DELETE_POST",
  id,
});
