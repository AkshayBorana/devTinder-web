const UserCard = ({user}) => {

  const { firstName, lastName, about, photoUrl, skills, age } = user;

    return (
      <>
        <div className="card bg-base-100 w-96 shadow-xl my-10">
          <figure className="h-50">
            <img src={photoUrl} alt="User image"></img>
          </figure>
          <div className="card-body">
            <h2 className="">{firstName} {lastName}</h2>
            <p>{about}</p>
            {age && <p>{age}</p>}
            <div className="justify-around">
              <button className="btn btn-primary mx-10">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        </div>
      </>
    );
};


export default UserCard;