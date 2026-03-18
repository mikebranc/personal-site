import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { firestore } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import "../blogAll.css";

export default function DataList({ data, type, deleteFunction }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data) {
      setSortedData([...data].sort((a, b) => a.order - b.order));
    }
  }, [data]);

  const handleReorder = async (index, direction) => {
    const newData = [...sortedData];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newData.length) {
      const [item] = newData.splice(index, 1);
      newData.splice(newIndex, 0, item);

      for (let i = 0; i < newData.length; i++) {
        await updateDoc(doc(firestore, type, newData[i].id), { order: i });
      }

      setSortedData(newData);
    }
  };

  const output = sortedData.map((entry, index) => {
    let title = "";
    let subtitle = null;
    let slug = "";

    if (type === "blog" || type === "publicBlog") {
      title = entry.title;
      subtitle = entry.date;
      slug = entry.slug;
    } else if (type === "project") {
      title = entry.name;
      slug = entry.id;
    } else if (type === "experience") {
      title = entry.position;
      subtitle = entry.company;
      slug = entry.id;
    }

    if (type === "publicBlog") {
      return (
        <Link to={`/blog/${slug}`} className="post" key={slug}>
          <div className="postDiv">
            <div>
              <h1 className="title">{title}</h1>
              {subtitle && <h3>{subtitle}</h3>}
            </div>
          </div>
        </Link>
      );
    }

    return (
      <div className="postEdit" key={entry.id}>
        <div className="postDiv">
          <div className="postContent">
            <h1 className="title">{title}</h1>
            {subtitle && <h3>{subtitle}</h3>}
          </div>
          <div className="actionButtons">
            <Link to={`/edit/${type}/${entry.id}`}>
              <EditIcon className="actionIcon" />
            </Link>
            <DeleteIcon className="actionIcon" onClick={(e) => deleteFunction(e, entry.id, type)} />
            <ArrowUpwardIcon className="actionIcon" onClick={() => handleReorder(index, "up")} />
            <ArrowDownwardIcon className="actionIcon" onClick={() => handleReorder(index, "down")} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="dataListWrapper">
      {type !== "publicBlog" && (
        <div className="editSectionHeader">
          <Link to="/edit" className="editSectionLink">
            Back to Edit
          </Link>
          <Link to={`/edit/${type}/new`} className="editSectionLink">
            <div className="newButton">New {type}</div>
          </Link>
        </div>
      )}
      {output}
    </div>
  );
}
