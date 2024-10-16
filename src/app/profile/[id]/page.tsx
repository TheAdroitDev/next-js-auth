export default function userProfile({params}:any ) {
    return (
      <div className=""> 
        Profile Page 
        <span className="">{params.id}</span>
      </div>
    )
  }
  