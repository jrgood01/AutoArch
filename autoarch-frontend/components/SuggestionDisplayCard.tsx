import NetworkVisualizer from "./NetworkVisualizer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface SuggestionDisplayCardProps {
    archSuggestion: { [key: string]: string[] } | null;
}

export function SuggestionDisplayCard(props: SuggestionDisplayCardProps) {
    return (
        <Card style={{width:"100%", height: "100%"}}>
            <CardHeader>
                <CardTitle>Architecture Diagram</CardTitle>
                <CardDescription>Suggested architecture diagram</CardDescription>
            </CardHeader>
            <CardContent style={{height:"calc(100% - 90px)"}}>
                <div style={{width:"100%", height:"100%"}}>
                    <NetworkVisualizer adjacencyDict={props.archSuggestion} />
                </div>
            </CardContent>
        </Card>
    )
}