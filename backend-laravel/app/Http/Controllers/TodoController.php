<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $todos = $request->user()
            ->todos()
            ->latest()
            ->get();

        return response()->json($todos);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $todo = $request->user()->todos()->create($validated);

        return response()->json([
            'message' => 'Todo créée',
            'todo' => $todo,
        ], 201);
    }

    public function show(Request $request, Todo $todo): JsonResponse
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        return response()->json($todo);
    }

    public function update(Request $request, Todo $todo): JsonResponse
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'completed' => ['sometimes', 'boolean'],
        ]);

        $todo->update($validated);

        return response()->json([
            'message' => 'Todo modifiée',
            'todo' => $todo->fresh(),
        ]);
    }

    public function destroy(Request $request, Todo $todo): JsonResponse
    {
        abort_unless($todo->user_id === $request->user()->id, 403);

        $todo->delete();

        return response()->json([
            'message' => 'Todo supprimée',
        ]);
    }
}
