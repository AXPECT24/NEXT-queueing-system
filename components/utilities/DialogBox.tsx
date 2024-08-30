import React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from '../ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface QueueData {
  name: string,
  customer_name: string,
  date_queued: Date,
  queueing_system: string
}

const DialogBox = (props: QueueData) => {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Queue Details </DialogTitle>
          <DialogDescription>
            Make sure to take note of your Queue Number
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 item-center gap-4">
            <span className="text-right">Queue Number: </span>
            <span className="col-span-3">{props.name} </span>
          </div>
          <div className="grid grid-cols-4 item-center gap-4">
            <span className="text-right">Customer Name: </span>
            <span className="col-span-3">{props.customer_name} </span>
          </div>
          <div className="grid grid-cols-4 item-center gap-4">
            <span className="text-right">Department: </span>
            <span className="col-span-3">{props.queueing_system} </span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="destructive">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBox