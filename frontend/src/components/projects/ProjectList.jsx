

const ProjectList = ({projects}) => {



console.log(projects);
    return (
        <>
        {projects.map((object)=>{
            {console.log(object)}
            {console.log(object.projectName)}
            <p>Test{object.projectName}</p>
        })}
{/*         {props?.map((object)=>{
<p>{object?.projectName}</p>
        })} */}
           {/*  {props.projects.map((project, key) => <ProjectSmall project={project} key={key} />)} */}
        </>

    )

}

export default ProjectList