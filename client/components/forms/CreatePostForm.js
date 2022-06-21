import { Avatar } from "antd";

const CreatePostForm = ({ content, setContent, postSubmit }) => {
  return (
    <div className="card">
      <div className="card-body pb-3">
        <form onSubmit={postSubmit} className="form-group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Write something..."
          ></textarea>
          <div className="card-footer">
            <button  disabled={!content} onClick={onSubmit} className="btn btn-primary btn-sm mt-1">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
