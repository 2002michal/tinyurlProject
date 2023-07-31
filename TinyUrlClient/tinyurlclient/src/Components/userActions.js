import { Button, TextField } from "@material-ui/core";
import { useRef } from "react";
import { getplatfromsByLink } from './service'




export default function UserActions() {

    // useEffect(() => {
    //     async function getAllLinks() {
    //         const links = await getAllLinksByUser()
    //     }
    const refLongUrl = useRef();
    const refTinyUrl = useRef();

    async function getAllplatfromsByLink() {
        console.log(refTinyUrl.current.value);
        const arr = await getplatfromsByLink(refTinyUrl.current.value);
        console.log(arr);
    }
    return <>
        <form>
            <TextField
                label="long url"
                variant="outlined"
                margin="normal"
                inputRef={refLongUrl}
                fullWidth
            />
            <TextField
                label="tiny url"
                variant="outlined"
                margin="normal"
                inputRef={refTinyUrl}
                fullWidth
            />
        </form>
        <Button onClick={getAllplatfromsByLink}>view </Button>


        <div>
            <canvas id="myChart"></canvas>
        </div>

        {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        <script>
            const ctx = document.getElementById('myChart');

            new Chart(ctx, {
                type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
      }]
    },
            options: {
                scales: {
                y: {
                beginAtZero: true
        }
      }
    }
  });
        </script> */}
    </>









}