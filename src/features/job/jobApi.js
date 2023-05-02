import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // post job
        postJob: builder.mutation({
            query: (data) => ({
                url: "/job",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
        }),
        // get all jobs
        getJobs: builder.query({
            query: () => ({
                url: "/jobs",
            }),
            providesTags: ["Jobs"],
        }),
        // get single job details
        jobById: builder.query({
            query: (id) => ({
                url: `job/${id}`,
            }),
            providesTags: ["Job"]
        }),
        // apply to job as a candidate
        apply: builder.mutation({
            query: (data) => ({
                url: "/apply",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Jobs"],
        }),
        // fetch applied jobs of a candidate
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`
            }),
            providesTags: ["Jobs"],
        }),
        // patch ask question to a job for a specific candidate
        question: builder.mutation({
            query: (data) => ({
                url: "/query",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
        // patch reply to a question to a job for a specific candidate
        reply: builder.mutation({
            query: (data) => ({
                url: "/reply",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Job"],
        }),
    })
})

export const {
    usePostJobMutation,
    useGetJobsQuery,
    useJobByIdQuery,
    useApplyMutation,
    useGetAppliedJobsQuery,
    useQuestionMutation,
    useReplyMutation,
} = jobApi;