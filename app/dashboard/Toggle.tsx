"use client";

type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={(e) => setToggle(false)}
      className="fixed bg-black/60 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are You sure You want to delete this post 🥲
        </h2>
        <h3 className="text-red-500">
          Presing the delete buttin will permanently delete your post
        </h3>
        <button
          onClick={deletePost}
          className="outline bg-none rounded-md p-2 outline-2 outline-red-500 hover:bg-red-500 hover:text-white"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default Toggle;
