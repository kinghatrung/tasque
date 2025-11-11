import { Trash2, ChevronRight } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

function Task() {
  return (
    <div className="p-4 border border-border rounded-lg">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-foreground">Quản lý công việc</h1>
            <p className="mt-1 text-base text-muted-foreground">
              Người dùng có thể chỉnh sửa công việc theo ý muốn của bản thân
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="cursor-pointer" variant="ghost">
              <ChevronRight className="h-4 w-4" />
              Tiếp
            </Button>

            <Button
              className="cursor-pointer text-destructive hover:bg-destructive/10 hover:text-destructive"
              variant="ghost"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="destructive" className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium border`}>
            Cao
          </Badge>
          <Badge variant="secondary" className={`inline-block rounded-full px-2.5 py-1 text-sm font-medium`}>
            Cần làm
          </Badge>
          <span className="text-sm text-muted-foreground">Hạn: 11/11/2025</span>
          <span className="text-sm text-muted-foreground">Nguyễn Minh Huyên</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
