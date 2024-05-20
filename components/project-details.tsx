"use client";

import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Editor from "./common/editor";
import { Badge } from "./ui/badge";

const ProjectDetails = ({ project }: { project: Project }) => {
  return (
    <Card className=" border-none">
      <CardHeader>
        <CardTitle>Project Name: {project.name}</CardTitle>
        <div className="flex flex-col p-10 gap-3">
          <h1 className="text-md font-semibold ">
            Manger : {project.manager.UserName}
          </h1>
          <div className="flex ">
            <h1>Client: </h1>
            <div className="flex space-x-1">
              {project.client.map((e) => (
                <Badge variant="outline">{e}</Badge>
              ))}
            </div>
          </div>
          <div className="flex ">
            <h1>Technology: </h1>
            <div className="flex space-x-1">
              {project.technology.map((e) => (
                <Badge variant="outline">{e}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-start">
            <h1>Participants: </h1>
            <div className="flex space-y-1 flex-col items-center">
              {project.participants.map((e) => (
                <Badge variant="outline">{e.UserName}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Editor initialContent={project.description} editable={false} />
      </CardContent>
    </Card>
  );
};

export default ProjectDetails;
