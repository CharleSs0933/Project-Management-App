"use client";

import { useSearchQuery } from "@/state/api";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchReults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading....</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchReults && (
          <div>
            {searchReults.tasks && searchReults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchReults.tasks?.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}

            {searchReults.projects && searchReults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchReults.projects?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}

            {searchReults.users && searchReults.users?.length > 0 && (
              <h2>users</h2>
            )}
            {searchReults.users?.map((user) => (
              <UserCard user={user} key={user.userId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
