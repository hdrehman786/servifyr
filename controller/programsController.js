import Program from "../models/Program"



export const AddPrograms = async (data) => {
    const program = await Program.insertMany(data);
    if (!program) {
        return {
            success: false,
            status: 400,
            message: "Failed to add programs",
            program: program
        }
    };
    return {
        success: true,
        status: 201,
        program: program,
        message: "Programs added successfully",
    }

}