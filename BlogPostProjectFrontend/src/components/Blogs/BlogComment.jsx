
 export function BlogComments({blogs}){

    return (
        <div>
            <ul >
                <list key={blogs.id}>
                    {blogs.comment}
                </list>
            </ul>
        </div>
    )
}