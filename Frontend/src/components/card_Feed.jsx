import Card from '@mui/material/Card';
//import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function ActionAreaCard({ title, url, description, name }) {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={url}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{name}</p>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

