import QBComponent from '../../lib/QBComponent';

export class DetailSkeleton extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="flex flex-col lg:flex-row">
            <!-- Image Placeholder -->
            <div class="lg:w-1/2 p-6">
                <div class="h-64 bg-gray-300 animate-pulse rounded-md"></div>
            </div>

            <!-- Details Placeholder -->
            <div class="lg:w-1/2 p-6 flex flex-col justify-between">
                <div class="space-y-4">
                    <div class="h-6 bg-gray-300 animate-pulse rounded-md w-3/4"></div>
                    <div class="h-4 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
                    <div class="h-4 bg-gray-300 animate-pulse rounded-md w-2/3"></div>
                    <div class="h-8 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
                </div>

                <div class="mt-6 flex items-center">
                    <div class="h-12 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
                    <button class="ml-4 px-6 py-2 bg-gray-300 text-white rounded-md animate-pulse"></button>
                </div>
            </div>
        </div>
    </div>
        `;
    };
}

class TableSkeleton extends QBComponent {
    protected markup: () => string = () => {
        return /*html*/ `
       <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-300">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-3 border-b border-gray-300 text-left"><div class="h-4 bg-gray-200 rounded"></div></th>
                        <th class="p-3 border-b border-gray-300 text-left"><div class="h-4 bg-gray-200 rounded"></div></th>
                        <th class="p-3 border-b border-gray-300 text-left"><div class="h-4 bg-gray-200 rounded"></div></th>
                        <th class="p-3 border-b border-gray-300 text-left"><div class="h-4 bg-gray-200 rounded"></div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                        <td class="p-3 border-b border-gray-300">
                            <div class="h-4 bg-gray-200 rounded"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        `;
    };
}

export default TableSkeleton;
