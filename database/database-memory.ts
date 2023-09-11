import { randomUUID } from "crypto";
import { TypeVideo } from "../types/video";

export class DatabaseMemory{
    #videos =  new Map<string, TypeVideo>();

    list(search?: string): TypeVideo[]{
      return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search){
                return video.title.includes(search);
            }
            return true;
        });
    }

    create(video: TypeVideo):void{
        //UUID -> Universal Unique ID
        const videosId = randomUUID();

        this.#videos.set(videosId, video);
    }

    update(id:string, video: TypeVideo):void{
        this.#videos.set(id, video);
    }

    delete(id:string):void{
        this.#videos.delete(id);
    }
}
