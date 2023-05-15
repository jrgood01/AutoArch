import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface DescriptionCardProps {
    generatedDescription: string;
}

export function DescriptionCard(props  : DescriptionCardProps) {
    const archDescriptionHeader = props.generatedDescription === "" ? `Run "Get Suggestion" to retrieve an architecture suggestion` : "AI recommended architecture:";
    return (
        <Card className="w-[350px]" style={{height:"100%"}}>
          <CardHeader>
            <CardTitle>Architecture Suggestion</CardTitle>
            <CardDescription>{archDescriptionHeader}</CardDescription>
          </CardHeader>
          <CardContent>
        <div style={{maxHeight:"350px", overflow:"scroll"}}>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {props.generatedDescription}
          </p>
          </div>
          </CardContent>
        </Card>
      )
}