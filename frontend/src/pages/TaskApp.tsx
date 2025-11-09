import { Button } from "~/components/ui/button";
import { authService } from "~/services/authService";

function TaskApp() {
  const handleTest = async () => {
    try {
      await authService.test();
      console.log("oke");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button className="cursor-pointer" onClick={handleTest}>
        Test
      </Button>
    </div>
  );
}

export default TaskApp;
