import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails.jsx";
import WorkoutForm from "../components/WorkoutForm.jsx";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = ()=>{

    const { workouts, dispatch } = useWorkoutsContext();
    const {user} = useAuthContext();
    
    useEffect(()=>{
        const getWorkouts = async()=>{
            const response = await fetch("/api/workouts", {
                headers: {'Authorization': `Bearer ${user.token}`}
            });
            const jsonData = await response.json();

            if(response.ok)
            {
                dispatch({type: 'SET_WORKOUTS', payload: jsonData});
            }
        }

        if(user)
        {
            getWorkouts();
        }
    },[dispatch,user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
        <WorkoutForm />
        </div>
    )
}

export default Home;